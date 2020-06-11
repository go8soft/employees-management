import http from "../http-common";

class EmployeeService {
  getAll() {
    return http.get("/employee");
  }
  
  get(id) {
    return http.get(`/employee/${id}`);
  }
  
  update(id, data) {
    return http.put(`/employee/${id}`, data);
  }
  
  delete(id) {
    return http.delete(`/employee/${id}`);
  }
  
  create(data) {
    return http.post("/employee", data);
  }
}

export default new EmployeeService();