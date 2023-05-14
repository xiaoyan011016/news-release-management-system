import axios from "axios"

function upload(path, userForm) {
  const fm = new FormData();
  for (let i in userForm) {
    fm.append(i, userForm[i]);
  }
  return axios({
    method: "POST",
    url: path,
    data: fm,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then(res => res.data)
}
export default upload