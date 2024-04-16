import { Canister, Err, Ok, Opt, Principal, Record, Result, StableBTreeMap, Variant, Vec, nat64, query, text, update, int64 } from 'azle';
const USERS_STORAGE_MEMORY_ID = 0;
const User = Record({
    id: Principal,
    username: text,
    password: text,
});
const UserCreateRequestDTO = Record({
    username: text,
    password: text
});
const Genre = Record({
    id: Principal,
    name: text
});
const GenreCreateDTO = Record({
    name: text,
});
const MusicCart = Record({
    id: Principal,
    name: text,
    genreId: Principal,
    authorId: Principal,
    quantity: text
});
const Music = Record({
    id: Principal,
    name: text,
    genreId: Vec(Principal),
    authorId: Principal,
    description: text,
    volume: int64,
    supply: int64,
    imageUrl: text
});
const MusicCreateDTO = Record({
    name: text,
    genreId: Vec(Principal),
    authorId: Principal,
    description: text,
    supply: int64,
    price: int64,
    imageUrl: text
});
const Cart = Record({
    id: Principal,
    userId: Principal,
    musics: Vec(MusicCart)
});
const CartCreateDTO = Record({
    userId: Principal,
    musicId: Principal,
    quantity: text
});
const RemoveFromCartDTO = Record({
    userId: Principal,
    musicId: Principal
});
const Error = Variant({
    UserDoesNotExist: Principal,
    GenreDoesNotExist: Principal,
    MusicDoesNotExist: Principal,
    UsernameDoesNotExist: text,
    CredentialNotMatch: text
});
let usersStorage = StableBTreeMap(0);
let genreStorage = StableBTreeMap(1);
let musicStorage = StableBTreeMap(2);
let cartStorage = StableBTreeMap(3);
const salt = 'b0257a9a0e8c6b3068d93c8ba58db7f1';
function generateId() {
    const randomBytes = new Array(29)
        .fill(0)
        .map((_) => Math.floor(Math.random() * 256));
    return Principal.fromUint8Array(Uint8Array.from(randomBytes));
}
// Function to hash a password
// function hashPassword(password: text) {
//   const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
//   return hash
// }
// function verifyPassword(password: text, hash: text) {
//   const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
//   return hashedPassword === hash;
// }
export default Canister({
    greet: query([text], text, (name) => {
        return `Hello, ${name}!`;
    }),
    createUser: update([UserCreateRequestDTO], User, (dto) => {
        const user = {
            id: generateId(),
            username: dto.username,
            password: dto.password
        };
        usersStorage.insert(user.id, user);
        return user;
    }),
    getUserById: query([Principal], Opt(User), (id) => {
        return usersStorage.get(id);
    }),
    getUserByUsername: query([text, text], Result(User, Error), (username, password) => {
        const allUsers = usersStorage.values();
        const user = allUsers.find(user => user.username === username);
        if (user == undefined) {
            return Err({
                UsernameDoesNotExist: username,
            });
        }
        if (user.password != password) {
            return Err({
                CredentialNotMatch: username
            });
        }
        const userResult = {
            id: user.id,
            password: user.password,
            username: user.username
        };
        return Ok(userResult);
    }),
    getUsers: query([], Vec(User), () => {
        return usersStorage.values();
    }),
    getUserCount: query([], nat64, () => {
        return usersStorage.len();
    }),
    createGenre: update([GenreCreateDTO], Genre, (dto) => {
        const genre = {
            id: generateId(),
            name: dto.name
        };
        genreStorage.insert(genre.id, genre);
        return genre;
    }),
    getGenreById: query([Principal], Opt(Genre), (id) => {
        return genreStorage.get(id);
    }),
    getGenres: query([], Vec(Genre), () => {
        return genreStorage.values();
    }),
    getGenreCount: query([], nat64, () => {
        return genreStorage.len();
    }),
    createMusic: update([MusicCreateDTO], Music, (dto) => {
        const music = {
            id: generateId(),
            name: dto.name,
            genreId: dto.genreId,
            authorId: dto.authorId,
            volume: 0,
            price: dto.price,
            imageUrl: dto.imageUrl
        };
        musicStorage.insert(music.id, music);
        return music;
    }),
    getMusicById: query([Principal], Opt(Music), (id) => {
        return musicStorage.get(id);
    }),
    getMusics: query([], Vec(Music), () => {
        return musicStorage.values();
    }),
    getMusicByName: query([text], Vec(Music), (name) => {
        const searchedMusic = [];
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
    createCart: update([CartCreateDTO], Cart, (dto) => {
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
        const musicCart = {
            authorId: musicOpt.Some.authorId,
            genreId: musicOpt.Some.genreId,
            name: musicOpt.Some.name,
            id: musicOpt.Some.id,
            quantity: dto.quantity
        };
        const keysIterator = cartStorage.keys();
        for (const key of keysIterator) {
            const cart = cartStorage.get(key);
            if (cart.Some?.userId.compareTo(dto.userId) == 'eq') {
                cart.Some?.musics.push(musicCart);
                return cart;
            }
        }
        const cart = ({
            id: generateId(),
            musics: [musicCart],
            userId: dto.userId
        });
        cartStorage.insert(cart.id, cart);
        return cart;
    }),
    getCartById: query([Principal], Opt(Music), (id) => {
        return musicStorage.get(id);
    }),
    getCarts: query([], Vec(Music), () => {
        return musicStorage.values();
    }),
    getCartCount: query([], nat64, () => {
        return musicStorage.len();
    }),
    deleteMusicFromCart: query([RemoveFromCartDTO], Result(text, Error), (dto) => {
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
    })
});
