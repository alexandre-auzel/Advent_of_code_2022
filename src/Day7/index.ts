import { join } from "path";
import { formatInput } from "../utils/format";

type Noeud = {
  path: string;
  size: number;
  isFile: boolean;
};

export const computePathAfterCD = (cdArg: string, currentDirectory: string) => {
  if (cdArg === "..") {
    return currentDirectory.split("/").slice(0, -2).join("/") + "/";
  } else {
    return currentDirectory + cdArg + "/";
  }
};

export const createDirectoryIfDoesntExist = (currentDirectory: string, treeToAddIn: Noeud[]) => {
  const exist = Boolean(treeToAddIn.find((node) => node.path === currentDirectory));
  if (!exist) {
    treeToAddIn.push({ path: currentDirectory, isFile: false, size: 0 });
  }
  return treeToAddIn;
};

const isInTree = (tree: Noeud[], path: string) => {
  return tree.some((node) => node.path === path);
};

export const extractFilesFromLs = (input: string[], index: number, currentDirectory: string) => {
  let files = [];
  let dir = [];
  let j = index + 1;
  while (j < input.length && !input[j].includes("$")) {
    const line = input[j];
    if (line.includes("dir")) {
      const dirToAdd = line.split(" ")[1];
      dir.push({ path: currentDirectory + dirToAdd + "/", isFile: false, size: 0 });
    } else {
      const [size, fileName] = line.split(" ");
      files.push({ path: currentDirectory + fileName, isFile: true, size: parseInt(size) });
    }
    j++;
  }
  return [files, dir];
};

export const extractDirectChildren = (parent: Noeud, tree: Noeud[]) => {
  return tree.filter(
    (node) =>
      ((node.isFile && node.path.split("/").slice(0, -1).join("/") + "/" === parent.path) ||
        (!node.isFile && node.path.split("/").slice(0, -2).join("/") + "/" === parent.path)) &&
      parent.path !== node.path
  );
};
export const computeSize = (node: Noeud, treeToCompute: Noeud[]) => {
  const children = extractDirectChildren(node, treeToCompute);
  return children.reduce((sum, child) => sum + computeSize(child, treeToCompute), 0);
};

const pushFiles = (tree: Noeud[], files: Noeud[]) => {
  const filesToAdd = files.filter((file) => !isInTree(tree, file.path));
  filesToAdd.forEach((file) => {
    tree.push(file);
    const parents = file.path.split("/").slice(0, -1);
    console.log(file, parents);
    for (let i = 0; i < parents.length; i++) {
      console.log(parents.slice(0, i + 1).join("/") + "/");
      const parent = tree.find((node) => node.path === parents.slice(0, i + 1).join("/") + "/");
      parent.size += file.size;
    }
  });
  return tree;
};

export const computeSizes = (treeToCompute: Noeud[]) => {
  treeToCompute.forEach((node, _, treeMemo) => {
    if (node.size) {
      return;
    }
    node.size = computeSize(node, treeMemo);
  });
  return treeToCompute;
};
export const constructTree = (input: string[]) => {
  let tree: Noeud[] = [{ path: "/", size: null, isFile: false }];
  let currentDirectory: string = "/";
  let i = 1;
  while (i < input.length) {
    const line = input[i];
    // console.log(line);
    // if (i === 26) {
    //   console.log(tree);
    //   throw new Error("stop");
    // }
    if (line.includes("$ cd")) {
      currentDirectory = computePathAfterCD(line.split(" cd ")[1], currentDirectory);
      console.log("move to:", currentDirectory);
      tree = createDirectoryIfDoesntExist(currentDirectory, tree);
      i++;
    } else if (line.includes("ls")) {
      const [files, dir] = extractFilesFromLs(input, i, currentDirectory);
      tree.push(...dir.filter((file) => !isInTree(tree, file.path)));
      tree = pushFiles(tree, files);
      console.log("there are: ", [...files, ...dir]);
      i = i + files.length + dir.length + 1;
    }
  }
  return tree;
};
export const day7 = () => {
  const input = formatInput("Day7/input.txt").returnLine;

  const tree = constructTree(input);
  // while (tree.some((node) => !node.size)) {
  //   console.log(tree.filter((node) => !node.size).length);
  //   tree.forEach((node, index, treeIt) => {
  //     const children = extractDirectChildren(node, treeIt);
  //     if (children.some((child) => !child.size)) {
  //       return;
  //     }
  //     node.size = children.reduce((sum, child) => sum + child.size, 0);
  //   });
  // }
  console.log(
    tree.reduce((sum, node) => {
      if (node.isFile) {
        return sum;
      }
      if (node.size >= 100000) {
        return sum;
      }
      return sum + node.size;
    }, 0)
  );
  const usedSpace = tree.find((node) => node.path === "/").size;
  const unusedSpace = 70000000 - usedSpace;
  const spaceToFree = 30000000 - unusedSpace;
  const dirWeCanDelete = tree.filter((node) => !node.isFile && node.size >= spaceToFree);
  console.log(
    dirWeCanDelete.reduce(
      (min, node) => {
        if (node.size < min.size) {
          return node;
        }
        return min;
      },
      { size: Number.MAX_SAFE_INTEGER }
    )
  );
};
