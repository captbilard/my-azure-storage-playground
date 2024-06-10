const {BlobServiceClient, StorageSharedKeyCredential} = require('@azure/storage-blob');
require('dotenv').config;

const accountName = process.env.AZURE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_ACCOUNT_KEY;
const azureStorageUrl = `https://${accountName}.blob.core.windows.net`;
if(!accountKey || !accountName){
    throw new Error('Azure Account Name or Key not found')
}

const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

const blobServiceClient = new BlobServiceClient(azureStorageUrl, sharedKeyCredential);

const containerName = 'fajoraina';

const uploadBlob = async (fileName) => {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.uploadBlockBlob(fileName, 'Hello-world', 12)

    console.log('upload successfull')
} 

const createContainer = async (name) => {
    const containerClient = await blobServiceClient.createContainer(name)
    console.log('Container created successfully', containerClient)
}

const listContainers = async () =>{
    const containersList = blobServiceClient.listContainers()
    console.log('Containers list:', listContainers)
    for await (const container of containersList){
        console.log('Container Name is: ',container.name)
    }
}

listContainers()