import { AuthDto } from "../src/auth/dto/auth.dto"
import * as request from "supertest"
import { Test, TestingModule } from "@nestjs/testing"
import { AppModule } from "../src/app.module"
import { INestApplication } from "@nestjs/common"

const failLogin: AuthDto = {
  login: 'tazaqsp2@mail.ru',
  password: 'gigabyte1',
}

const successLogin: AuthDto = {
  login: 'tazaqsp2@mail.ru',
  password: 'gigabyte',
}

describe('Auth tests e2e', () => {
  let app: INestApplication
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()

  })

  it('login - fail', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(failLogin)
      .expect(401)
  })

  it('login - success', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(successLogin)
      .expect(200)
  })
})
