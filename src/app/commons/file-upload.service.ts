import { Injectable } from '@angular/core';
import { LoadingService } from './loading-service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private loadingService: LoadingService) { }

  handleUploadWithCallback(event: any, reader: FileReader, callback: any) {
    this.loadingService.start("Uploading image").then((loading)=>{
      let file = event.target.files[0];      
      reader.readAsDataURL(file);
      reader.onload = callback(reader, loading);
    });    
  }
}
