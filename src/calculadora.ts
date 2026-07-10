export default class Calculadora {

  private PrimeiroNumero: number = 0;
  private SegundoNumero: number = 0;
  private operador: string = "";

  public setFirst(value: number): void {
    this.PrimeiroNumero = value;
  }

  public setSecond(value: number): void {
    this.SegundoNumero = value;
  }

  public setOperator(op: string): void {
    this.operador = op;
  }

  public calculate(): number {

    switch (this.operador) {

      case "+":
        return this.PrimeiroNumero + this.SegundoNumero;

      case "-":
        return this.PrimeiroNumero - this.SegundoNumero;

      case "*":
        return this.PrimeiroNumero * this.SegundoNumero;

      case "/":
        if (this.SegundoNumero === 0) {
          throw new Error("Divisão por zero não é permitida.");
        }
        return this.PrimeiroNumero / this.SegundoNumero;

      default:
        return 0;
    }

  }

}