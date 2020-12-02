import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  fileName: string;
  fileSize: string;
  @ViewChild('fileInput') fileInput: ElementRef;
  constructor() { }

  ngOnInit() {
   

}

attachFile(){
  this.fileInput.nativeElement.click();
}
processFile(file){
  //console.log(file);
  this.fileName = file.name;
  this.fileSize = (file.size / 1000000).toFixed(2);
}

removeFile(){
  
}
}
