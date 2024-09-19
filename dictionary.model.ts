

export interface IDictionary<T> {
    get(key: string|number):T|undefined;
    set(key: string|number,value:T):void
    add(key: string|number, value: T): void;
    remove(key: string|number): void;
    containsKey(key: string|number): boolean;
    keys(): any[];
    values(): T[];
    forEach(callback: (value: any, index: number, array: Dictionary<T>) => void): void ;
  }


 export class Dictionary<T> implements IDictionary<T> {

    private _keys: any[] = [];
    private _values: T[] = [];

    get(key: string|number):T|undefined{
        var index = this._keys.indexOf(key, 0);
        if(index>=0){
            return  this._values[this._keys[index]];
        }
        return undefined;
    }
    set(key: string|number,value:T):void{
        var index = this._keys.indexOf(key, 0);
        if(index<0){
            throw "key don't exist";
        }
        this._values[index] =value;

    }
    add(key: string|number, value: T) {
        if(this.containsKey(key) ==true){
            throw "key already exist";
        }
      this._keys.push(key);
      this._values.push(value);

    }

    remove(key: string|number) {
      var index = this._keys.indexOf(key, 0);
      if(index<0){
         throw "key don't exist";
      }
 
      this._keys.splice(index, 1);
      this._values.splice(index, 1);
    
    }

    keys(): any[] {
      return this._keys;
    }
    keyAt(index:number):string|number{
       try{
         let key =this._keys[index];
         return key;
       }catch{
        throw "Out of index";
       }
        
    }
    valueAt(index:number):T{
       try{
         let key =this._values[index];
         return key;
       }catch{
        throw "Out of index";
       }
        
    }
    values(): T[] {
      return this._values;
    }

    containsKey(key: string|number) {
      if (typeof this.get(key) === "undefined") {
        return false;
      }
      return true;
    }
    forEach(callback: (value: any, index: number, array: Dictionary<T>) => void): void {
        const arr: Dictionary<T> = this;
        
        for (let i = 0; i < arr._keys.length; i++) {
            let key = arr._keys[i] ;
          callback({
            key:key,
            value: arr._values[i]
          }, i, arr);
        }
      }
  }
  export interface INewDictionary<T>{
    [Key:string|number]:T
  }
  export interface IFormDictionary<T> {
    get(key: string|number):T|undefined;
    set(key: string|number,value:T):void
    add(key: string|number, value: T): void;
    remove(key: string|number): void;
    containsKey(key: string|number): boolean;
    keys(): any[];
    values(): T[];
    forEach(callback: (value: any, index: number, array: NewDictionay<T>) => void): void;
  }
  export class NewDictionay<T> implements IFormDictionary<T>{
    private dict:INewDictionary<T>={}
    containsKey(key: string|number) {
        if (typeof this.dict[key] === "undefined") {
          return false;
        }
        return true;
    }
    keys(): any {
        var keys = [];
        for(var key in this.dict){
           keys.push(key);
        }
        return keys;
    }
    keyAt(index:number):string|number{
        let i=0;
        for(var key in this.dict){
            if(i==index){
              return key;
            }
        }
        throw "Out of index";
    }
    valueAt(index:number):T{
        let i=0;
        for(var key in this.dict){
            if(i==index){
              return this.dict[key] ;
            }
        }
        throw "Out of index";
    }
    values(): T[] {
        let values =[];
        for(var key in this.dict) {
            var value = this.dict[key];
            values.push(value);
        }
        return values;
      }
    get(key: string|number):T|undefined{
        if(this.containsKey(key)){
            return  this.dict[key];
        }
        return undefined;
    }
    set(key: string|number,value:T):void{
        if(this.containsKey(key) == false){
            throw "key don't exist";
        }
       this.dict[key]=value;
    }
    add(key: string|number, value: T) {
        if(this.containsKey(key) ==true){
            throw "key already exist";
        }
      this.dict[key]=value;
    }

    remove(key: string|number) {
      if(this.containsKey(key) == false){
         throw "key don't exist";
      }
      delete this.dict[key];
    
    }
    forEach(callback: (value: any, index: number, array: NewDictionay<T>) => void): void {
        const arr: NewDictionay<T> = this;
        let i=0;
        for(var key in this.dict){
            callback({
                key:key,
                value: arr.dict[key]
              }, i, arr);
              i++;
         }
    }
  }