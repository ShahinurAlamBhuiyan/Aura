import 'dotenv/config'

export default {
    expo: {
        name: 'aura',
        slug: 'aura',
        version: '1.0.0',
        android: {
            package: 'com.shahin.aura',
        },
        extra: {
            APPWRITE_ENDPOINT: process.env.APPWRITE_ENDPOINT,
            APPWRITE_PLATFORM: process.env.APPWRITE_PLATFORM,
            APPWRITE_PROJECT_ID: process.env.APPWRITE_PROJECT_ID,
            APPWRITE_DATABASE_ID: process.env.APPWRITE_DATABASE_ID,
            APPWRITE_USER_COLLECTION_ID: process.env.APPWRITE_USER_COLLECTION_ID,
            APPWRITE_VIDEO_COLLECTION_ID: process.env.APPWRITE_VIDEO_COLLECTION_ID,
            APPWRITE_STORAGE_ID: process.env.APPWRITE_STORAGE_ID,
            eas: {
                projectId: "07f118dc-2eb4-4ca2-a613-87842d6f5ceb",
            },
        },
    },
}
