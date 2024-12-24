<template>

    <div class="row">
        <div class="col-md-12 d-flex justify-content-center my-2">
            <h3>Google Drive view</h3>
        </div>

        <div class="col-md-12 file-upload-container">
            <template v-if="fileUploadStatus === 'File uploaded successfully'">
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    {{ fileUploadStatus }}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </template>

            <template v-else-if="fileUploadStatus === 'File upload failed'">
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    {{ fileUploadStatus }}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </template>

            <h5> Upload File on current Google Drive folder</h5>
            <input type="file" ref="fileInput" @change="handleFileSelect" />
            <button type="button" class="btn btn-outline-primary" @click="uploadFile">Upload File</button>
            <span v-if="fileUploadStatus === 'Processing'"> Uploading file .... </span>

        </div>
    </div>

    <div class="col-md-12 my-5">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">File/ Folder Name</th>
                    <th scope="col">File/Folder Type</th>
                    <th scope="col">Modified Time</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="file in files" :key="file.id">
                    <td>{{ file.name }}</td>
                    <td>{{ file.mimeType.includes(".folder") ? 'Folder' : "File" }}</td>
                    <td> {{ convertToReadableTime(file.modifiedTime) }}</td>
                    <td class="d-flex justify-content-around">
                        <template v-if="!file.mimeType.includes('.folder')">
                            <button type="button" class="btn btn-success btn-sm" @click="downloadFile(file)">Download
                            </button>
                        </template>
                        <template v-else>
                            <button type="button" class="btn btn-primary btn-sm" @click="redirectToFolder(file.id)">Open
                                Folder</button>
                        </template>

                        <button type="button" class="btn btn-danger btn-sm" @click="deleteFile(file.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="col-md-12 d-flex justify-content-around my-4">
        <button type="button" class="btn btn-secondary" @click="goBackRoute">Back to previous folder</button>
        <button type="button" class="btn btn-warning" @click="redirectHome">Google Drive Home Page</button>
    </div>

</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from '@/stores/auth_store'
import getConfig from '@/config';



const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const config = getConfig();

const fileInput = ref(null);
const files = ref([]);
const folderId = ref(route.params.id); // Make folderId reactive

const selectedFile = ref(null);
const fileUploadStatus = ref('');

// Watch for changes in route params to reload files
watch(() => route.params.id, async (newFolderId) => {
    folderId.value = newFolderId;
    await fetchFiles(newFolderId);
});

function convertToReadableTime(utcTimestamp) {
    // Parse the UTC timestamp
    const utcDate = new Date(utcTimestamp);

    // Formatting options
    const options = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };

    // Convert to user's local time and format it
    return utcDate.toLocaleString('en-US', options);
}

async function fetchFiles(folderId) {
    try {
        const token = authStore.token;
        let url = `${config.backendUrl}/files`
        if (folderId !== 'root') {
            url += `?folderid=${folderId}`
        }
        const response = await axios.get(url, {
            headers: {
                Authorization: `${token}`
            }
        });

        if (response.status === 200) {
            console.log('Files fetched successfully:', response.data);
            files.value = response.data;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function downloadFile(file) {
    try {
        let fileName = file.name;
        if (file.mimeType === 'application/vnd.google-apps.document') {
            fileName = fileName + '.docx'; // Set the file name with .pdf extension
        } else if (file.mimeType === 'application/vnd.google-apps.spreadsheet') {
            fileName = fileName + '.xlsx'; // Set the file name with .xlsx extension
        } else if (file.mimeType === 'application/vnd.google-apps.presentation') {
            fileName = fileName + '.pptx'; // Set the file name with .pptx extension
        }

        const token = authStore.token;
        const response = await axios.get(`${config.backendUrl}/files/download/${file.id}`, {
            headers: {
                Authorization: `${token}`
            },
            responseType: 'blob',  // Ensure we get the file as a Blob
        });

        if (response.status === 200) {
            // Create a URL for the Blob object
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Create a link element
            const link = document.createElement('a');
            link.href = url;



            link.setAttribute('download', fileName); // Set the download attribute with filename
            document.body.appendChild(link);  // Append the link to the body
            link.click();  // Programmatically click the link to trigger the download

            // Clean up by revoking the URL and removing the link
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        }
    } catch (error) {
        console.log('Error downloading file:', error);
    }
}


function handleFileSelect(event) {
    fileUploadStatus.value = '';
    selectedFile.value = event.target.files[0];
    console.log('Selected file:', selectedFile.value);
}
async function uploadFile() {
    if (!selectedFile.value) {
        console.log('No file selected for upload.');
        return;
    }
    fileUploadStatus.value = 'Processing'

    const formData = new FormData();
    formData.append('file', selectedFile.value);
    formData.append('folderid', folderId.value === 'root' ? null : folderId.value); // Pass the current folder ID

    try {
        const token = authStore.token;
        const response = await axios.post(`${config.backendUrl}/files/upload`, formData, {
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status === 201) {
            fileUploadStatus.value = 'File uploaded successfully';
            selectedFile.value = null; // Clear the selected file
            if (fileInput.value) {
                fileInput.value.value = ''; // Clear the file input element
            }
            await fetchFiles(folderId.value); // Refresh the file list
        }
    } catch (error) {
        console.error('Error uploading file:', error);
        fileUploadStatus.value = 'File upload failed';
    }
}


async function deleteFile(fileId) {
    const token = authStore.token;
    const response = await axios.delete(`${config.backendUrl}/files/${fileId}`, {
        headers: {
            Authorization: `${token}`
        }
    });
    if (response.status === 200) {
        // console.log('File deleted successfully');
        await fetchFiles(folderId.value);
    }
    else {
        console.log('Error deleting file:', response.data);
    }
}

async function redirectToFolder(folderId) {
    console.log('Redirecting to folder:', folderId);
    router.push({ name: "GoogleDriveFolderView", params: { id: folderId } });
}

function goBackRoute() {
    router.back();
}

function redirectHome() {
    router.push({ name: "GoogleDriveFolderView", params: { id: 'root' } });
}

onMounted(async () => {
    await fetchFiles(folderId.value);
});
</script>

<style scoped>
.file-upload-container {
    border: 1px solid grey;
    padding: 10px;
    border-radius: 8px;
}
</style>