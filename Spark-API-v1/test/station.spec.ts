import route from "../src/routes/station";

import * as chai from "chai";
import chaiHttp = require("chai-http");
import "mocha";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Calculator Tests", () => {
    it("should return 5 when 2 is added to 3", () => {
        const result = 2 + 3;
        chai.assert.equal(result, 5);
    });
});
