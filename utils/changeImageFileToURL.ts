import sender from "@/apis/sender";

const changeImageFileToURL = async (imageFile: File, columnId: number, accessToken: string | undefined) => {
  const imageFormData = new FormData();
  imageFormData.append("image", imageFile);

  const imageRes = await sender.post({
    path: "cardImage",
    id: columnId,
    data: imageFormData,
    accessToken,
  });

  if (!imageRes) return;

  const {
    data: { imageUrl },
  } = imageRes;

  return imageUrl;
};

export default changeImageFileToURL;
