const upload_preset = "fast_food";
const cloud_name = "duonatslc";
const api_url = `https://api.cloudinary.com/v1_1/${cloud_name}/upload`

export const uploadImageToCloudinary = async (file) => {

    const data = new FormData();

    data.append("file", file);
    data.append("upload_preset", upload_preset);
    data.append("cloud_name", cloud_name);

    const res = await fetch(api_url, {
        method: "post",
        body: data
    }

    );
   
    const fileData = await res.json();
  
    return fileData.url;
}