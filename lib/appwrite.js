// import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite';

// export const config = {
//     endpoint: "https://cloud.appwrite.io/v1",
//     platform: "com.shahin.aura",
//     projectId: "67c4c183000c8059b3b4",
//     APPWRITE_DATABASE_ID: "67c4c2d1000d5da1c5bc",
//     APPWRITE_USER_COLLECTION_ID: "67c4c2e6000f2ca69f2a",
//     APPWRITE_VIDEO_COLLECTION_ID: "67c4c2ff0032c0eb886b",
//     APPWRITE_STORAGE_ID: "67c4c43e00113813e4a6",
// }

import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite';
import Constants from 'expo-constants';

const {
    APPWRITE_ENDPOINT,
    APPWRITE_PLATFORM,
    APPWRITE_PROJECT_ID,
    APPWRITE_DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID,
    APPWRITE_VIDEO_COLLECTION_ID,
    APPWRITE_STORAGE_ID,
} = Constants.expoConfig?.extra || {};



// const {
//     endpoint,
//     platform,
//     projectId,
//     APPWRITE_DATABASE_ID,
//     APPWRITE_USER_COLLECTION_ID,
//     APPWRITE_VIDEO_COLLECTION_ID,
//     APPWRITE_STORAGE_ID,
// } = config;


const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID)
    .setPlatform(APPWRITE_PLATFORM);


const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

// Register User...
export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password);

        const newUser = await databases.createDocument(
            APPWRITE_DATABASE_ID,
            APPWRITE_USER_COLLECTION_ID,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )

        return newUser;
    } catch (error) {
        throw new Error(error);
    }
}


// Sign-in
export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        throw new Error(error);
    }
}


// Get Account
export const getAccount = async () => {
    try {
        const currentAccount = await account.get();
        return currentAccount;
    } catch (error) {
        throw new Error(error);
    }
}

// Get Current User
export const getCurrentUser = async () => {
    try {
        const currentAccount = await getAccount();

        if (!currentAccount) throw new Error;

        const currentUser = await databases.listDocuments(
            APPWRITE_DATABASE_ID,
            APPWRITE_USER_COLLECTION_ID,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if (!currentUser) throw new Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error)
        return null;
    }
}


// Get All Posts
export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            APPWRITE_DATABASE_ID,
            APPWRITE_VIDEO_COLLECTION_ID,
            [Query.orderDesc('$createdAt')]
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

// Get Latest Posts
export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            APPWRITE_DATABASE_ID,
            APPWRITE_VIDEO_COLLECTION_ID,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

// Get Search Posts
export const getSearchedPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
            APPWRITE_DATABASE_ID,
            APPWRITE_VIDEO_COLLECTION_ID,
            [Query.search('title', query)]
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}
// Get Search Posts
export const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(
            APPWRITE_DATABASE_ID,
            APPWRITE_VIDEO_COLLECTION_ID,
            [Query.equal('creator', userId), Query.orderDesc('$createdAt')]
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const signOut = async () => {
    try {
        const session = await account.deleteSession('current')
        return session
    } catch (error) {
        throw new Error(error)
    }
}

export const getFilePreview = async (fileId, type) => {
    let fileUrl;

    try {
        if (type === 'video') {
            fileUrl = storage.getFileView(APPWRITE_STORAGE_ID, fileId)
        } else if (type === 'image') {
            fileUrl = storage.getFilePreview(APPWRITE_STORAGE_ID, fileId, 2000, 2000, 'top', 100)
        } else {
            throw new Error('Invalid file type')
        }

        if (!fileUrl) throw new Error;

        return fileUrl;
    } catch (error) {
        throw new Error(error)
    }
}

export const uploadFile = async (file, type) => {
    if (!file) return;

    const asset = {
        name: file.fileName,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri
    }

    try {
        const uploadedFile = await storage.createFile(
            APPWRITE_STORAGE_ID,
            ID.unique(),
            asset
        );

        console.log('uploaded', uploadedFile)
        const fileUrl = await getFilePreview(uploadedFile.$id, type);

        return fileUrl;

    } catch (error) {
        throw new Error(error)
    }
}


export const createVideo = async (form) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video'),
        ])

        const newPost = await databases.createDocument(APPWRITE_DATABASE_ID, APPWRITE_VIDEO_COLLECTION_ID, ID.unique(), {
            title: form.title,
            thumbnail: thumbnailUrl,
            video: videoUrl,
            prompt: form.prompt,
            creator: form.userId
        })

        return newPost;
    } catch (error) {
        throw new Error(error)
    }
}