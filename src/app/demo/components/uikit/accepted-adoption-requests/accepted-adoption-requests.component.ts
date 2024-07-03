import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';

@Component({
    templateUrl: './accepted-adoption-requests.component.html',
    providers: [MessageService],

})
export class AcceptedAdoptionRequestsComponent implements OnInit {

    productDialog: boolean = false;

    completeProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[] = [];

    product: Product = {};

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];
    selectedOrder: any;

    rowsPerPageOptions = [5, 10, 20];

    constructor(private productService: ProductService, private messageService: MessageService) { }

    ngOnInit() {
        // this.productService.getProducts('assets/demo/data/dogs-products.json').then(data => this.products = data);
        this.getProducts()
        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.selectedOrder = product;

        this.productDialog = true;

    }



    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Oreder Completed', life: 3000 });
        this.selectedProducts = [];
    }

    confirmComplete() {
        this.completeProductDialog = false;
        this.productService.addItemToJSON('completed-orders.json', this.product, () => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Completed', life: 3000 });
            this.delete(this.product.id);

        });
    }
    delete(productId: any) {
        // this.products = this.products.filter(product => product.id !== productId);

        this.productService.deleteItemFromJSON('new-orders.json', productId, () => {
            this.product = {};
            this.getProducts();

        });

    }
    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }
    // UTF-8 to Base64 encoding function
    utf8ToBase64(str: string): string {
        const bytes = new TextEncoder().encode(str);
        return btoa(String.fromCharCode(...new Uint8Array(bytes.buffer)));
    }

    // Base64 to UTF-8 decoding function
    base64ToUtf8(str: string): string {
        const bytes = Uint8Array.from(atob(str), c => c.charCodeAt(0));
        return new TextDecoder().decode(bytes);
    }
    getProducts() {
        this.products = [];

        // Fetch the first JSON file
        this.productService.getAllProducts('accepted-adoption-requests.json').subscribe(
            (data1: any) => {
                console.log('First request successful', data1);

                try {
                    const decodedContent1 = this.base64ToUtf8(data1.content);
                    const products1 = JSON.parse(decodedContent1);
                    console.log('First file decoded and parsed', products1);

                    // Fetch the second JSON file
                    this.productService.getAllProducts('ar-accepted-adoption-requests.json').subscribe(
                        (data2: any) => {
                            console.log('Second request successful', data2);

                            try {
                                const decodedContent2 = this.base64ToUtf8(data2.content);
                                const products2 = JSON.parse(decodedContent2);
                                console.log('Second file decoded and parsed', products2);

                                // Combine the results from both files
                                this.products = [...products1, ...products2];
                                console.log('Combined products', this.products);
                            } catch (error) {
                                console.error('Error parsing second file', error);
                                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to parse second file', life: 3000 });
                            }
                        },
                        error => {
                            console.error('Second request failed', error);
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load second file', life: 3000 });
                        }
                    );
                } catch (error) {
                    console.error('Error parsing first file', error);
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to parse first file', life: 3000 });
                }
            },
            error => {
                console.error('First request failed', error);
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load first file', life: 3000 });
            }
        );
    }
    // getProducts() {
    //     this.products = [];
    //     this.productService.getAllProducts('accepted-adoption-requests.json').subscribe(
    //         (data: any) => {
    //             try {
    //                 const decodedContent = this.base64ToUtf8(data.content);
    //                 const products = JSON.parse(decodedContent);
    //                 this.products = products;
    //             } catch (error) {
    //                 console.error('Error parsing JSON data:', error);
    //                 this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to parse JSON data', life: 3000 });
    //             }
    //         },
    //         error => {
    //             console.error('Error fetching JSON data:', error);
    //             this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch JSON data', life: 3000 });
    //         }
    //     );
    // }
    completeProduct(product: Product) {
        this.completeProductDialog = true;
        this.product = { ...product };

    }


    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
