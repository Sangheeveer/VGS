const typedArrayToBase64=(buffer)=>{
    //const str="";
    const bytes=[...new Uint8Array(buffer)]
    const binaryString = bytes.reduce((str, byte) => str + String.fromCharCode(byte), '');
    const base64String = btoa(binaryString);

    return `data:image/jpeg;base64,${base64String}`;
}

export default typedArrayToBase64;