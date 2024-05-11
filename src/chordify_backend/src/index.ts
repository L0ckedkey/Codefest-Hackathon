import { DocumentPlusIcon } from '@heroicons/react/24/outline';
import { Canister, Err, Ok, Opt, Principal, Record, Result, StableBTreeMap, Variant, Vec, nat64, query, text, update, int64 } from 'azle';
import { sha256 } from 'js-sha256';

const USERS_STORAGE_MEMORY_ID = 0;


const User = Record({
  id: Principal,
  username: text,
  password: text,
  imageUrl: text
});
type User = typeof User.tsType;

const UserCreateRequestDTO = Record({
  username: text,
  password: text
});
type UserCreateRequestDTO = typeof UserCreateRequestDTO.tsType;

const UserResultDTO = Record({
  id: Principal,
  username: text,
  imageUrl: text
});
type UserResultDTO = typeof UserResultDTO.tsType;

const Genre = Record({
  id: Principal,
  name: text
})
type Genre = typeof Genre.tsType;

const GenreCreateDTO = Record({
  name: text,
});
type GenreCreateRequestDTO = typeof GenreCreateDTO.tsType;

const MusicCart = Record({
  id: Principal,
  name: text,
  genreId: Principal,
  authorId: Principal,
  quantity: text
})
type MusicCart = typeof MusicCart.tsType;

const Music = Record({
  id: Principal,
  name: text,
  genres: Vec(text),
  author: UserResultDTO,
  description: text,
  volume: int64,
  supply: int64,
  price: int64,
  imageUrl: text,
  saleEnd: int64,
})
type Music = typeof Music.tsType;

const MusicCreateDTO = Record({
  name: text,
  genres: Vec(text),
  authorId: Principal,
  description: text,
  supply: int64,
  price: int64,
  imageUrl: text,
  saleEnd: int64
});
type MusicCreateRequestDTO = typeof MusicCreateDTO.tsType;

const MusicByVolumeDescDTO = Record({
  limit: int64
});
type getMusicByVolumeDescDTO = typeof MusicByVolumeDescDTO.tsType;

const Cart = Record({
  id: Principal,
  userId: Principal,
  musicId: Principal,
  quantity: int64
})
type Cart = typeof Cart.tsType;

const CartCreateDTO = Record({
  userId: Principal,
  musicId: Principal
})
type CartCreateRequestDTO = typeof CartCreateDTO.tsType;


const CartCreateQuantityDTO = Record({
  userId: Principal,
  cartId: Principal
})
type CartCreateQuantityRequestDTO = typeof CartCreateQuantityDTO.tsType;

const CartCreateQuantityByValueDTO = Record({
  userId: Principal,
  cartId: Principal,
  quantity: int64
})
type CartCreateQuantityByValueRequestDTO = typeof CartCreateQuantityByValueDTO.tsType;

const RemoveFromCartDTO = Record({
  userId: Principal,
  musicId: Principal
});
type RemoveFromCartRequestDTO = typeof RemoveFromCartDTO.tsType;

const Error = Variant({
  UserDoesNotExist: Principal,
  GenreDoesNotExist: Principal,
  MusicDoesNotExist: Principal,
  CartDoesNotExist: Principal,
  UsernameDoesNotExist: text,
  CredentialNotMatch: text,
  InvalidMusicName: text,
  InvalidMusicPrice: text,
  NoGenre: text,
  ParameterMissing: text
});
type Error = typeof Error.tsType;

let usersStorage = StableBTreeMap<Principal, User>(0);
let genreStorage = StableBTreeMap<Principal, Genre>(1)
let musicStorage = StableBTreeMap<Principal, Music>(2)
let cartStorage = StableBTreeMap<Principal, Cart>(3)

const saltRounds = 10;
const secretKey = 'my-secret'

function generateId(): Principal {
  const randomBytes = new Array(29)
    .fill(0)
    .map((_) => Math.floor(Math.random() * 256));

  return Principal.fromUint8Array(Uint8Array.from(randomBytes));
}

function hashPassword(password: string) {
  const salt = 'your-salt-value';
  const saltedPassword = password + salt;

  const hash = sha256(saltedPassword);
  return hash;
}

function verifyPassword(password: string, storedHash: string) {
  const hashedPassword = hashPassword(password);
  return hashedPassword !== storedHash;
}

function bubbleSortByVolumeDesc(musicList: Music[]): Music[] {
  const n = musicList.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (musicList[j].volume < musicList[j + 1].volume) {
        // Swap musicList[j] and musicList[j + 1]
        const temp = musicList[j];
        musicList[j] = musicList[j + 1];
        musicList[j + 1] = temp;
      }
    }
  }

  return musicList;
}

export default Canister({
  greet: query([text], text, (name) => {
    return `Hello, ${name}!`;
  }),

  createUser: update(
    [UserCreateRequestDTO],
    User,
    (dto: UserCreateRequestDTO) => {
      const user: User = {
        id: generateId(),
        username: dto.username,
        password: hashPassword(dto.password),
        imageUrl: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bXVzaWN8ZW58MHx8MHx8fDA%3D"
      };
      usersStorage.insert(user.id, user);

      return user;
    }
  ),

  getUserById: query([Principal], Result(UserResultDTO, Error), (id: Principal) => {
    const userOpt = usersStorage.get(id);
    const user = userOpt.Some;
    if (user == undefined) {
      return Err({
        UserDoesNotExist: id
      })
    }
    const userResult: UserResultDTO = {
      id: user.id,
      username: user.username,
      imageUrl: user.imageUrl
    }

    return Ok(userResult);
  }),

  login: query([UserCreateRequestDTO], Result(UserResultDTO, Error), (dto: UserCreateRequestDTO) => {
    const allUsers = usersStorage.values();

    const user = allUsers.find(user => user.username === dto.username);

    if (user == undefined) {
      return Err({
        UsernameDoesNotExist: dto.username,
      });
    }

    if (verifyPassword(dto.password, user.password)) {
      return Err({
        CredentialNotMatch: dto.username
      })
    }

    const userResult: UserResultDTO = {
      id: user.id,
      username: user.username,
      imageUrl: user.imageUrl
    }

    return Ok(userResult)
  }),

  getUsers: query([], Vec(User), () => {
    return usersStorage.values();
  }),

  getUserCount: query([], nat64, () => {
    return usersStorage.len();
  }),

  createGenre: update(
    [GenreCreateDTO],
    Genre,
    (dto: GenreCreateRequestDTO) => {
      const genre: Genre = {
        id: generateId(),
        name: dto.name
      }
      genreStorage.insert(genre.id, genre)

      return genre;
    }
  ),

  getGenreById: query([Principal], Opt(Genre), (id: Principal) => {
    return genreStorage.get(id);
  }),

  getGenres: query([], Vec(Genre), () => {
    return genreStorage.values();
  }),

  getGenreCount: query([], nat64, () => {
    return genreStorage.len();
  }),

  createMusic: update(
    [MusicCreateDTO],
    Result(Music, Error),
    (dto: MusicCreateRequestDTO) => {

      const user: User = usersStorage.get(dto.authorId).Some!

      if (!user) {
        return Err({
          UserDoesNotExist: dto.authorId
        })
      }

      const author: UserResultDTO = {
        id: user.id,
        imageUrl: user.imageUrl,
        username: user.username
      }

      const music: Music = {
        id: generateId(),
        name: dto.name,
        genres: dto.genres,
        author: author,
        volume: BigInt(0),
        price: dto.price,
        imageUrl: dto.imageUrl,
        supply: dto.supply,
        description: dto.description,
        saleEnd: dto.saleEnd
      }
      musicStorage.insert(music.id, music)

      return Ok(music);
    }
  ),

  getMusicByVolumeDesc: query([MusicByVolumeDescDTO], Result(Vec(Music), Error), (dto: getMusicByVolumeDescDTO) => {

    if (dto.limit == undefined) {
      return Err({
        ParameterMissing: 'limit',
      });
    }

    const allMusic = musicStorage.values()
    const sortedMusic = bubbleSortByVolumeDesc(allMusic)

    return Ok(sortedMusic.slice(0, Number(dto.limit)))
  }),

  getMusicById: query([Principal], Result(Music, Error), (id: Principal) => {
    const music = musicStorage.get(id).Some
    if (!music) {
      return Err({
        MusicDoesNotExist: id
      })
    }
    return Ok(music)
  }),


  getMusics: query([], Vec(Music), () => {
    return musicStorage.values();
  }),

  getMusicByName: query([text], Vec(Music), (name: text) => {
    const searchedMusic: Music[] = [];

    for (const music of musicStorage.values()) {
      if (music.name.includes(name)) {
        searchedMusic.push(music);
      }
    }
    return searchedMusic;
  }),

  getMusicCount: query([], nat64, () => {
    return musicStorage.len();
  }),

  addToCart: update(
    [CartCreateDTO],
    Result(Cart, Error),
    (dto: CartCreateRequestDTO) => {
      const userOpt = usersStorage.get(dto.userId);
      if ("None" in userOpt) {
        return Err({
          UserDoesNotExist: dto.userId,
        });
      }

      const musicOpt = musicStorage.get(dto.musicId)

      if ("None" in musicOpt) {
        return Err({
          MusicDoesNotExist: dto.musicId,
        });
      }

      const cart: Cart = ({
        id: generateId(),
        musicId: dto.musicId,
        userId: dto.userId,
        quantity: BigInt(1)
      })

      cartStorage.insert(cart.id, cart)
      return Ok(cart);
    }
  ),

  addCartQuantity: update(
    [CartCreateQuantityDTO],
    Result(Opt(Cart), Error),
    (dto: CartCreateQuantityRequestDTO) => {
      const userOpt = usersStorage.get(dto.userId);
      if ("None" in userOpt) {
        return Err({
          UserDoesNotExist: dto.userId,
        });
      }

      const cartOpt = cartStorage.get(dto.cartId)

      if ("None" in cartOpt) {
        return Err({
          CartDoesNotExist: dto.cartId,
        });
      }

      const qty = cartOpt.Some.quantity + BigInt(1)

      cartOpt.Some.quantity = qty

      return Ok(cartOpt);
    }
  ),

  addCartQuantityByValue: update(
    [CartCreateQuantityByValueDTO],
    Result(Opt(Cart), Error),
    (dto: CartCreateQuantityByValueRequestDTO) => {
      const userOpt = usersStorage.get(dto.userId);
      if ("None" in userOpt) {
        return Err({
          UserDoesNotExist: dto.userId,
        });
      }

      const cartOpt = cartStorage.get(dto.cartId)

      if ("None" in cartOpt) {
        return Err({
          CartDoesNotExist: dto.cartId,
        });
      }

      const qty = cartOpt.Some.quantity + BigInt(dto.quantity)

      cartOpt.Some.quantity = qty

      return Ok(cartOpt);
    }
  ),

  removeCartQuantity: update(
    [CartCreateQuantityDTO],
    Result(Opt(Cart), Error),
    (dto: CartCreateQuantityRequestDTO) => {
      const userOpt = usersStorage.get(dto.userId);
      if ("None" in userOpt) {
        return Err({
          UserDoesNotExist: dto.userId,
        });
      }

      const cartOpt = cartStorage.get(dto.cartId)

      if ("None" in cartOpt) {
        return Err({
          CartDoesNotExist: dto.cartId,
        });
      }

      const qty = cartOpt.Some.quantity - BigInt(1)

      if (qty <= 0) {
        cartStorage.remove(cartOpt.Some.id)
      } else {
        cartOpt.Some.quantity = qty
      }

      return Ok(cartOpt);
    }
  ),

  removeCart: update(
    [CartCreateQuantityDTO],
    Result(Opt(Cart), Error),
    (dto: CartCreateQuantityRequestDTO) => {
      const userOpt = usersStorage.get(dto.userId);
      if ("None" in userOpt) {
        return Err({
          UserDoesNotExist: dto.userId,
        });
      }

      const cartOpt = cartStorage.get(dto.cartId)

      if ("None" in cartOpt) {
        return Err({
          CartDoesNotExist: dto.cartId,
        });
      }

      cartStorage.remove(cartOpt.Some.id)

      return Ok(cartOpt);
    }
  ),

  getCartById: query([Principal], Opt(Music), (id: Principal) => {
    return musicStorage.get(id);
  }),

  getCarts: query([], Vec(Music), () => {
    return musicStorage.values();
  }),

  getCartCount: query([], nat64, () => {
    return musicStorage.len();
  }),

  // deleteMusicFromCart: query([RemoveFromCartDTO], Result(text, Error), (dto: RemoveFromCartRequestDTO) => {

  //   const userOpt = usersStorage.get(dto.userId);
  //   if ("None" in userOpt) {
  //     return Err({
  //       UserDoesNotExist: dto.userId,
  //     });
  //   }

  //   const musicOpt = musicStorage.get(dto.musicId);
  //   if ("None" in musicOpt) {
  //     return Err({
  //       MusicDoesNotExist: dto.musicId,
  //     });
  //   }


  //   for (const cart of cartStorage.values()) {
  //     if (cart.userId === dto.userId) {

  //       break;
  //     }
  //   }

  //   return "asd";
  // }),

  getMusicByGenre: query([text], Result(Music, Error), (genre) => {
    const allMusic = musicStorage.values();
    const musicResult = allMusic.find(music => music.genres.includes(genre));
    if (musicResult == undefined) {
      return Err({
        NoGenre: genre
      });
    }
    return Ok(musicResult)
  }),
})
