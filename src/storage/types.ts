import { SudokuGrigType } from "sudoku";

interface GrigInfo {
  difficult: number
  grid:SudokuGrigType
}

type StorageSaveGrid = (grigInfo:GrigInfo) =>void;
type StorageGetGrid = () => GrigInfo | null;

interface StorageType {
  saveGrid: StorageSaveGrid,
  getGrid: StorageGetGrid
}

export { StorageSaveGrid, StorageGetGrid, StorageType }