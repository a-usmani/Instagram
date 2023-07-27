import {firebase, FieldValue} from '../lib/firebase'
//firebase calls to read and write on the photos and users documents
export async function doesUsernameExist(username) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username','==',username.toLowerCase())
        .get()
        
        return result.docs.length > 0
}

export async function getUserByUsername(username) {
    const result = await firebase
      .firestore()
      .collection('users')
      .where('username', '==', username.toLowerCase())
      .get()
  
    return result.docs.map((item) => ({
      ...item.data(),
      docId: item.id
    }))
  }
  
  export async function getUserByUserId(userId) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('userId', '==', userId)
        .get()
    return result.docs.map((item) => ({
      ...item.data(),
      docId: item.id
    }))
  }

  export async function getSuggestedProfiles(userId, following) {
    let query = firebase
        .firestore()
        .collection('users')

    if (following.length > 0){
      query = query.where('userId', 'not-in', [...following, userId])
    }
    else {
      query = query.where('userId', '!=', userId)
    }
    const result = await query.limit(5).get()
    return result.docs.map((item) => ({
      ...item.data(),
      docId: item.id
    }))
  }

  export async function updateLoggedInUserFollowing(loggedInUserDocId, profileId, isFollowingProfile) {
    return firebase
      .firestore()
      .collection('users')
      .doc(loggedInUserDocId)
      .update({
        following: isFollowingProfile ?
          FieldValue.arrayRemove(profileId) :
          FieldValue.arrayUnion(profileId)
      });
  }
  
  export async function updateFollowedUserFollowers(profileDocId, loggedInUserId, isFollowingProfile ) {
    return firebase
      .firestore()
      .collection('users')
      .doc(profileDocId)
      .update({
        followers: isFollowingProfile ?
          FieldValue.arrayRemove(loggedInUserId) :
          FieldValue.arrayUnion(loggedInUserId)
      });
  }
  
  export async function getPhotos(userId, following){
    const result = await firebase
        .firestore()
        .collection('photos')
        .where('userId', 'in', following)
        .get()
    const followedPhotos = result.docs.map((item) => ({
      ...item.data(),
      docId: item.id
    }))

    const photosWithUserInfo = await Promise.all(
      followedPhotos.map( async (photo) => {
        let userLikedPhoto = false
        if (photo.likes.includes(userId)){
          userLikedPhoto=true
        }
        const user = await getUserByUserId(photo.userId)
        const { username } = user[0]
        return {username , ...photo, userLikedPhoto}
      })
    )

    return photosWithUserInfo
  }

  export async function getUserPhotosByUserId(userId){
    const result = await firebase
        .firestore()
        .collection('photos')
        .where('userId', '==', userId)
        .get()
    return result.docs.map((item) => ({
      ...item.data(),
      docId: item.id
    }))
  }

  export async function isUserFollowingProfile(userUsername, profileUserId){
    const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', userUsername)
    .where('following', 'array-contains', profileUserId)
    .get()

    return result.docs.map((item) => ({
      ...item.data(),
      docId: item.id
    }))
  }

  export async function toggleFollow(isFollowingProfile, userDocId, profileDocId, userId, profileUserId){
    await updateLoggedInUserFollowing(userDocId, profileUserId, isFollowingProfile)
    await updateFollowedUserFollowers(profileDocId, userId, isFollowingProfile )
  }
