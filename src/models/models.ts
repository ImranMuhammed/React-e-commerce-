export interface Product {
    id: 1;
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
