import { AuthDto } from "../src/auth/dto/auth.dto"
import * as request from "supertest"
import { Test, TestingModule } from "@nestjs/testing"
import { AppModule } from "../src/app.module"
import { INestApplication } from "@nestjs/common"
import { disconnect } from "mongoose"
import { USER_NOT_FOUND, WRONG_PASSWORD_ERROR } from "../src/auth/auth.consts"

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
      .expect(401, {
        statusCode: 401,
        message: WRONG_PASSWORD_ERROR,
        error: 'Unauthorized',
      })
  })

  it('login - success', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(successLogin)
      .expect(200)
      .then(({ body }) => {
        expect(body.access_token).toBeDefined()
      })
  })

  it('login not found - success', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ login: 'hello@mail.ru', password: 'asdfasfa' })
      .expect(401, {
        statusCode: 401,
        message: USER_NOT_FOUND,
        error: 'Unauthorized',
      })
  })

  afterAll(() => {
    disconnect()
  })
})
