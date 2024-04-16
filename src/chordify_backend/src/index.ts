import { DocumentPlusIcon } from '@heroicons/react/24/outline';
import { Canister, Err, Ok, Opt, Principal, Record, Result, StableBTreeMap, Variant, Vec, nat64, query, text, update, int64 } from 'azle';
import { sha256 } from 'js-sha256';

const USERS_STORAGE_MEMORY_ID = 0;


const User = Record({
  id: Principal,
  username: text,
  password: text,
});
type User = typeof User.tsType;

const UserCreateRequestDTO = Record({
  username: text,
  password: text
});
type UserCreateRequestDTO = typeof UserCreateRequestDTO.tsType;

const UserResultDTO = Record({
  id: Principal,
  username: text
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
  authorId: Principal,
  description: text,
  volume: int64,
  supply: int64,
  price: int64,
  imageUrl: text
})
type Music = typeof Music.tsType;

const MusicCreateDTO = Record({
  name: text,
  genres: Vec(text),
  authorId: Principal,
  description: text, 
  supply: int64, 
  price: int64, 
  imageUrl: text
});
type MusicCreateRequestDTO = typeof MusicCreateDTO.tsType;

const Cart = Record({
  id: Principal,
  userId: Principal,
  musics: Vec(MusicCart)
})
type Cart = typeof Cart.tsType;

const CartCreateDTO = Record({
  userId: Principal,
  musicId: Principal,
  quantity: text
});
type CartCreateRequestDTO = typeof CartCreateDTO.tsType;

const RemoveFromCartDTO = Record({
  userId: Principal,
  musicId: Principal
});
type RemoveFromCartRequestDTO = typeof RemoveFromCartDTO.tsType;

const Error = Variant({
  UserDoesNotExist: Principal,
  GenreDoesNotExist: Principal,
  MusicDoesNotExist: Principal,
  UsernameDoesNotExist: text,
  CredentialNotMatch: text,
  InvalidMusicName: text,
  InvalidMusicPrice: text,
  NoGenre: text,
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
        password: hashPassword(dto.password)
      };
      usersStorage.insert(user.id, user);

      return user;
    }
  ),

  getUserById: query([Principal], Result(UserResultDTO, Error), (id: Principal) => {
    const userOpt = usersStorage.get(id);
    const user = userOpt.Some;
    if(user == undefined){
      return Err({
        UserDoesNotExist: id
      })
    }
    const userResult: UserResultDTO = {
      id: user.id,
      username: user.username
    }

    return Ok(userResult);
  }),

  login: query([UserCreateRequestDTO], Result(Principal, Error), (dto: UserCreateRequestDTO) => {
    const allUsers = usersStorage.values();

    const user = allUsers.find(user => user.username === dto.username);
    
    if (user == undefined) {
      return Err({
        UsernameDoesNotExist: dto.username,
      });
    }

    if(verifyPassword(dto.password, user.password)){
      return Err({
        CredentialNotMatch: dto.username
      })
    }
    
    return Ok(user.id)
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
    Music,
    (dto: MusicCreateRequestDTO) => {
      
      const music: Music = {
        id: generateId(),
        name: dto.name,
        genres: dto.genres,
        authorId: dto.authorId,
        volume: BigInt(0),
        price: dto.price,
        imageUrl: dto.imageUrl,
        supply: dto.supply,
        description: dto.description
      }
      musicStorage.insert(music.id, music)

      return music;
    }
  ),

  getMusicById: query([Principal], Opt(Music), (id: Principal) => {
    return musicStorage.get(id);
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



  createCart: update(
    [CartCreateDTO],
    Cart,
    (dto: CartCreateRequestDTO) => {
      const userOpt = usersStorage.get(dto.userId);
      if ("None" in userOpt) {
        return Err({
          UserDoesNotExist: dto.userId,
        });
      }

      const musicOpt = musicStorage.get(dto.musicId);
      if ("None" in musicOpt) {
        return Err({
          MusicDoesNotExist: dto.userId,
        });
      }

      const musicCart: MusicCart = {
        authorId: musicOpt.Some.authorId,
        genreId: musicOpt.Some.genreId,
        name: musicOpt.Some.name,
        id: musicOpt.Some.id,
        quantity: dto.quantity
      }

      const keysIterator = cartStorage.keys();

      for (const key of keysIterator) {
        const cart = cartStorage.get(key);

        if (cart.Some?.userId.compareTo(dto.userId) == 'eq') {


          cart.Some?.musics.push(musicCart)

          return cart;
        }
      }

      const cart: Cart = ({
        id: generateId(),
        musics: [musicCart],
        userId: dto.userId
      })

      cartStorage.insert(cart.id, cart)

      return cart;

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

  deleteMusicFromCart: query([RemoveFromCartDTO], Result(text, Error), (dto: RemoveFromCartRequestDTO) => {

    const userOpt = usersStorage.get(dto.userId);
    if ("None" in userOpt) {
      return Err({
        UserDoesNotExist: dto.userId,
      });
    }

    const musicOpt = musicStorage.get(dto.musicId);
    if ("None" in musicOpt) {
      return Err({
        MusicDoesNotExist: dto.musicId,
      });
    }


    for (const cart of cartStorage.values()) {
      if (cart.userId === dto.userId) {

        break;
      }
    }

    return "asd";
  }),

  getMusicByGenre: query([text], Result(Music, Error), (genre) => {
    const allMusic = musicStorage.values();
    const musicResult = allMusic.find(music => music.genres.includes(genre));
    if(musicResult == undefined){
      return Err({
        NoGenre: genre
      });
    }
    return Ok(musicResult)
  }),
})
