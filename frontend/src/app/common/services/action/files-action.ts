export module FilesAction {

  export interface GetAllAreas {
    areas: string[];
  }

  export interface LsResult {
    nodes: Node[];
  }

  export interface Node {
    name: string;
    type: string;
  }

}
