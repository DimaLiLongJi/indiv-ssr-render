// import { Service } from 'indiv';
import { Service } from '../../../InDiv/src';

@Service({
  isSingletonMode: true,
})

export default class TestService {
  public data: number;
  constructor() {
    this.data = 1;
  }

  public getData = (): number => {
    return this.data;
  }
  public setData = (data: number): void => {
    this.data = data;
  }
}
