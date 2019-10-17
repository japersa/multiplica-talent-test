import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Color } from './color';
import { ColorsResponse } from './colors-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})

export class AppComponent implements OnInit {

  color: Color;
  colors: Color[];
  colorsResponse: ColorsResponse;
  page = 1;
  pageSize = 1;
  collectionSize = 1;

  constructor(private _appService: AppService) {}

  ngOnInit() {
    this.getColors();
  }

  getColors() {
    this._appService.getColors()
      .then(data => {
        this.setDataColors(data);
      })
      .catch(error => console.log(error));
  }

  pageChange(){
    this._appService.getColorsPerPage(this.page)
      .then(data => {
          this.setDataColors(data);
      })
      .catch(error => console.log(error));
  }

  private setDataColors(data: ColorsResponse) {
    this.colorsResponse = data;
    this.colors = data.data;
    this.page = data.page;
    this.pageSize = data.per_page;
    this.collectionSize = data.total;
  }

  selectColor(color: Color){
    this.color = color;
    this.copyToClipboard(color.color)
    this.removeColorSelected();
  }

  copyToClipboard(value: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = value;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
  
  private removeColorSelected() {
    setTimeout(() => {
      this.color = null;
    }, 1000);
  }

}
