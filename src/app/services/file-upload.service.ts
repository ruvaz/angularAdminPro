import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actualizarFoto(
    archivo:File,
    tipo:'usuarios'|'medicos'|'hospitales',
    id:string
  ){

    try{
      const url =`${base_url}/upload/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('imagen',archivo);
      const resp = await fetch(url,{
        method:'put',
        headers:{
          'x-token':localStorage.getItem('token')||''
        },
        body: formData
      });

      const data = await resp.json();
      //console.log(data);
      // data: info de la imagen
      // {ok: true, msg: "Archivo subido", file: "1345c4df-be07-48a0-b362-d99cf2df536d.png"}

      if(data.ok){
        return data.file;
      }else{
        console.log(data.msg);
        return false;
      }

    }catch (err){
      console.log(err);
      return false;
    }
  }

}
