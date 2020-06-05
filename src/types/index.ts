export interface Task {
  "groupName": string,
  "id": number,
  "title": string,
  "status": string,
  "description": string
}

export interface RootState {
  token: string,
  groups: string[],
  tasks: Task[]
}

export interface Filters {
  name: string,
  status: string
}

export interface Auth {
  login: string,
  password: string
}

export interface Forms {
  groupName: string,
  id: number | null,
  title: string,
  status: boolean,
  description: string
}
