export interface Task {
  "groupName": string,
  "id": number,
  "title": string,
  "status": string,
  "description": string
}

export interface Filters {
  name:  string,
  status:  string
}
export interface RootState {
  token: string,
  groups: string[],
  tasks: Task[]
}

export interface Auth {
  login: string,
  password: string
}

