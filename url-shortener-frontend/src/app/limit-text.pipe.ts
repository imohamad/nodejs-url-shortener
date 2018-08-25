import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "limitText"
})
export class CutTextPipe implements PipeTransform {
  transform(text: string, limitNumber: number): any {
    if (text.length > limitNumber) {
      return text.substr(0, limitNumber) + "...";
    }
    return text;
  }
}
