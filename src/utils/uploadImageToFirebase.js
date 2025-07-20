import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";

export const uploadImageToFirebase = async (file) => {
  const storage = getStorage();
  const imageRef = ref(storage, `profileImages/${uuid() + file.name}`);

  const snapshot = await uploadBytes(imageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};
