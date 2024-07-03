import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../api/product';

@Injectable()
export class ProductService {

    // githubUsername = 'mennahassan159753';
    // repositoryName = 'Petty-data';
    // personalAccessToken = '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';
    githubUsername = 'Ali8970';
    repositoryName = 'Graduation-project-data';
    branchName = 'main';
    personalAccessToken = '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';

    // personalAccessToken = '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';

    constructor(private http: HttpClient) { }

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

    getAllProducts(filePath: string) {
        const urlWithParams = `https://api.github.com/repos/${this.githubUsername}/${this.repositoryName}/contents/${filePath}` + `?timestamp=${new Date().getTime()}`;
        return this.http.get<any[]>(urlWithParams);
    }

    addItemToJSON(filePath: string, item: any, callback: () => void) {
        // Fetch current content of the JSON file
        this.http.get(`https://api.github.com/repos/${this.githubUsername}/${this.repositoryName}/contents/${filePath}`, {
            headers: new HttpHeaders({
                Authorization: `token ${this.personalAccessToken}`
            })
        }).subscribe((data: any) => {
            const decodedContent = this.base64ToUtf8(data.content); // Decode content from base64

            // Parse the existing JSON content
            const existingItems = JSON.parse(decodedContent);

            // Add new item
            existingItems.push(item);

            // Encode the updated JSON content
            const encodedContent = this.utf8ToBase64(JSON.stringify(existingItems, null, 2)); // Encode content to base64

            // Prepare data for updating the file
            const body = {
                message: 'Add new item',
                content: encodedContent,
                sha: data.sha,
                branch: this.branchName
            };

            // Update the JSON file
            this.http.put(`https://api.github.com/repos/${this.githubUsername}/${this.repositoryName}/contents/${filePath}`, body, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Authorization: `token ${this.personalAccessToken}`
                })
            }).subscribe(() => {
                // Call the callback function to fetch the updated data
                callback();
            }, (error) => {
                console.error('Failed to add item:', error);
            });
        }, (error) => {
            console.error('Error fetching JSON:', error);
        });
    }

    updateItemInJSON(filePath: string, itemId: any, updatedItem: any, callback: () => void) {
        // Fetch current content of the JSON file
        this.http.get(`https://api.github.com/repos/${this.githubUsername}/${this.repositoryName}/contents/${filePath}` + `?timestamp=${new Date().getTime()}`, {
            headers: new HttpHeaders({
                Authorization: `token ${this.personalAccessToken}`
            })
        }).subscribe((data: any) => {
            const decodedContent = this.base64ToUtf8(data.content); // Decode content from base64

            // Parse the existing JSON content
            let existingItems = JSON.parse(decodedContent);

            // Find the index of the item to update
            const index = existingItems.findIndex((item: any) => item.id === itemId);

            // Update the item
            existingItems[index] = updatedItem;

            // Encode the updated JSON content
            const encodedContent = this.utf8ToBase64(JSON.stringify(existingItems, null, 2)); // Encode content to base64

            // Prepare data for updating the file
            const body = {
                message: 'Update item',
                content: encodedContent,
                sha: data.sha,
                branch: this.branchName
            };

            // Update the JSON file
            this.http.put(`https://api.github.com/repos/${this.githubUsername}/${this.repositoryName}/contents/${filePath}`, body, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Authorization: `token ${this.personalAccessToken}`
                })
            }).subscribe(() => {
                callback();
            }, (error) => {
                console.error('Failed to update item:', error);
            });

        }, (error) => {
            console.error('Error fetching JSON:', error);
        });
    }

    deleteItemFromJSON(filePath: string, itemId: number, callback: () => void) {
        // Fetch current content of the JSON file
        this.http.get(`https://api.github.com/repos/${this.githubUsername}/${this.repositoryName}/contents/${filePath}`, {
            headers: new HttpHeaders({
                Authorization: `token ${this.personalAccessToken}`
            })
        }).subscribe((data: any) => {
            const decodedContent = this.base64ToUtf8(data.content); // Decode content from base64

            // Parse the existing JSON content
            let existingItems = JSON.parse(decodedContent);

            // Find the index of the item to delete
            const index = existingItems.findIndex((item: any) => item.id === itemId);

            if (index !== -1) {
                // Remove the item from the array
                existingItems.splice(index, 1);

                // Encode the updated JSON content
                const encodedContent = this.utf8ToBase64(JSON.stringify(existingItems, null, 2)); // Encode content to base64

                // Prepare data for updating the file
                const body = {
                    message: 'Delete item',
                    content: encodedContent,
                    sha: data.sha,
                    branch: this.branchName
                };

                // Update the JSON file
                this.http.put(`https://api.github.com/repos/${this.githubUsername}/${this.repositoryName}/contents/${filePath}`, body, {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        Authorization: `token ${this.personalAccessToken}`
                    })
                }).subscribe(() => {
                    callback();
                }, (error) => {
                    console.error('Failed to delete item:', error);
                });
            } else {
                console.log('Item not found.');
            }
        }, (error) => {
            console.error('Error fetching JSON:', error);
        });
    }
}
