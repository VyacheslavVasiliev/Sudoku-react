import { StorageSaveGrid, StorageGetGrid } from './types';

const saveGrid:StorageSaveGrid = ( grigInfo ) => {
  const gridStringify = JSON.stringify(grigInfo);
  sessionStorage.setItem("grigInfo", gridStringify);
};

const getGrid:StorageGetGrid = () => {
  const gridStringify = sessionStorage.getItem("grigInfo");

  if(gridStringify) {
    return JSON.parse(gridStringify);
  }

  return null;
}

export { saveGrid, getGrid };