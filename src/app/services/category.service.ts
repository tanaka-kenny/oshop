import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  constructor(private db: AngularFireDatabase) {
   }

   getCateogories() {
    return this.db.list('categories', ref => ref.orderByChild('name')).snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.key, obj: c.payload.val() })))
    );
   }
}
