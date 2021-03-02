export default function buildFileSelector(isMultiple: boolean , cb :any , cb2:any = null){
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    isMultiple && fileSelector.setAttribute('multiple', 'multiple');
    fileSelector.addEventListener("change", function fileDialogChanged (e: any){
        const fileList = e.path[0].files;
        if(cb2){
            isMultiple ? cb2(fileList) : cb2(fileList[0])
        }

        if(fileList.length > 0){
            let pathFileListTemp: string[] = [];

            for (let index = 0; index < fileList.length; index++) {
                const pathFile = URL.createObjectURL(fileList[index]); 
                pathFileListTemp.push(pathFile);
            }

            cb(pathFileListTemp);
        }   
    });
    return fileSelector;
}