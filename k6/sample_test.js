import http from "k6/http";
import { sleep } from "k6";

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    vus: 1,
    duration: "10s",
};
export default function () {
    http.get("http://localhost:4000/user");
    sleep(1);
}
