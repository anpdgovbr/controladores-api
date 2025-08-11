import { Test, TestingModule } from "@nestjs/testing"
import { ControladorService } from "./controlador.service"

describe("ControladorService", () => {
  let service: ControladorService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ControladorService],
    }).compile()

    service = module.get<ControladorService>(ControladorService)
  })

  it("should be defined", () => {
    expect(service).toBeDefined()
  })
})
