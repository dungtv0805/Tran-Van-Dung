import 'reflect-metadata';

export declare type Constructor<T = unknown> =
  | (new (...args: any[]) => T)
  | (abstract new (...args: any[]) => T);

export const csFactoryClassMetaName = Symbol('cs-factory:class');
// Singleton để quản lý đăng ký lớp
class ClassRegistry {
  private static instance: ClassRegistry;
  private registeredClasses: {
    [collection: string]: { [type: string]: new (...args: any[]) => any };
  } = {};

  getRegisterClasses() {
    return this.registeredClasses;
  }

  static getInstance(): ClassRegistry {
    if (!ClassRegistry.instance) {
      ClassRegistry.instance = new ClassRegistry();
    }
    return ClassRegistry.instance;
  }

  registerClass(collectionName: string, type: string, constructor: any) {
    if (!this.registeredClasses[collectionName])
      this.registeredClasses[collectionName] = {};
    this.registeredClasses[collectionName][type] = constructor;
  }

  getClass(type: string) {
    return this.registeredClasses[type];
  }
}

// Định nghĩa một decorator để đăng ký các lớp
export function RegisterFactory(collectionName: string, type?: string) {
  return function <T extends { new (...args: any[]): any }>(constructor: T) {
    const registry = ClassRegistry.getInstance();
    const realType = type || constructor['name'];
    registry.registerClass(collectionName, realType, constructor);
    constructor['type'] = collectionName;
    Reflect.defineMetadata(csFactoryClassMetaName, type, constructor);
    return constructor;
  };
}

export function RegisterHelloworld() {
  return RegisterFactory('helloworld');
}

export class Factory<K extends abstract new (...args: any[]) => any = any> {
  private items: { [type: string]: new (...args: any[]) => any };

  constructor(protected collectionName = 'helloworld') {
    const registry = ClassRegistry.getInstance();
    this.items = registry.getRegisterClasses()[collectionName] || {};
  }

  createItem<T extends K = any>(
    c: T | string,
    ...args: ConstructorParameters<T>
  ): InstanceType<T> {
    const type = typeof c === 'string' ? c : c['name'];
    const ItemClass = this.items[type];
    if (ItemClass) {
      return new ItemClass(...args) as InstanceType<T>;
    }
    throw new Error(`${c} not yet regist`);
  }
}

@RegisterHelloworld()
class TypeAClass {
  constructor(public propA: string) {}
}
