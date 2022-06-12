export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
  }

  export interface Cart{
    product:Product;
    size:string;
    qty:number;
}
