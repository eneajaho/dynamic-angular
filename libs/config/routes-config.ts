export interface RoutesConfig {
  routes: Route[];
}

export interface Route {
  path: string;
  data: RouteData;
}

export interface RouteData {
  title:  string;
  blocks: Block[];
}

export interface Block {
  type: string;
  data: BlockData;
}

export interface BlockData {
  links?: Link[];
  items?: Item[];
  [key: string]: any;
}

export interface Item {
  id:              string;
  previewImageUrl: string;
  title:           string;
}

export interface Link {
  url:   string;
  title: string;
}
