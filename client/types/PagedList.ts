export class PagedList<T> {
  data: T[];
  navigation: PagedListNavigation;

  constructor() {
    this.data = [];
    this.navigation = new PagedListNavigation();
  }
}

export class PagedListNavigation {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;

  constructor() {
    this.currentPage = 1;
    this.totalPages = 1;
    this.pageSize = 1;
    this.totalCount = 1;
    this.hasPrevious = false;
    this.hasNext = false;
  }
}
