import { AbstractControl } from "@angular/forms";
import { Observable, Observer, of } from "rxjs";

// Video resource for this code:
// https://www.udemy.com/course/angular-2-and-nodejs-the-practical-guide/learn/lecture/10523224#overview
// https://www.udemy.com/course/angular-2-and-nodejs-the-practical-guide/learn/lecture/14852496#overview

export const mimeType = (control: AbstractControl): Promise<{[key: string]: any}> | Observable<{[key: string]: any}> => {
  if(typeof(control.value) === 'string'){
    return of(null);
  }

  const file = control.value as File;
  const fileReader = new FileReader();
  const filereaderObservable = new Observable((observer: Observer<{[key: string]: any}>) => {

    fileReader.addEventListener('loadend', () => {
      const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);

      let header = '';
      for(let i = 0; i < arr.length; i++){
        header += arr[i].toString(16);
      }

      let isValid = false;
      switch (header) {
        case "89504e47":
          isValid = true;
          break;
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
          isValid = true;
          break;
        default:
          isValid = false; // Or you can use the blob.type as fallback
          break;
      };

      if(isValid){
        observer.next(null); // The null value that is return is the valid type
      } else {
        observer.next({invalidMimeType: true});
      }
      observer.complete();

    });
    fileReader.readAsArrayBuffer(file);
  });

  return filereaderObservable;
};