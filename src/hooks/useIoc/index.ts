//========================================================
// typescript 依赖注入(DI)与控制反转(IOC)示例
//========================================================
import 'reflect-metadata';
import { inject, injectable, Container } from 'inversify';

const container = new Container();

@injectable()
class PopMusic {
  getName() {
    return '流行音乐';
  }
}
container.bind('request1').to(PopMusic);

@injectable()
class ClassicalMusic {
  getName() {
    return '古典音乐';
  }
}
container.bind('request2').to(ClassicalMusic);

@injectable()
class Music {
  pm: any;
  cm: any;
  constructor(@inject('request1') popMusic: any, @inject('request2') classicalMusic: any) {
    this.pm = popMusic;
    this.cm = classicalMusic;
  }

  getName() {
    const result = this.pm.getName() + this.cm.getName();
    return result;
  }
}
container.bind('Plan').to(Music);

const music: any = container.get('Plan');
console.log(music.getName()); // 输出>> 流行音乐古典音乐

class FooBarInterface {
  public foo: PopMusic;
  public bar: ClassicalMusic;
  constructor(@inject('request1') foo: PopMusic, @inject('request2') bar: ClassicalMusic) {
    this.foo = foo;
    this.bar = bar;
  }
  getName() {
    const result = this.foo.getName() + this.bar.getName();
    return result;
  }
}

@injectable()
class FooBar implements FooBarInterface {
  public foo: PopMusic;
  public bar: ClassicalMusic;
  public log() {
    console.log('foobar');
  }
  constructor(@inject('request1') foo: PopMusic, @inject('request2') bar: ClassicalMusic) {
    this.foo = foo;
    this.bar = bar;
  }
  getName() {
    const result = this.foo.getName() + this.bar.getName();
    return result;
  }
}
const useIoc = container.get<FooBar>('Plan');
console.log(useIoc.getName());

export { useIoc };
