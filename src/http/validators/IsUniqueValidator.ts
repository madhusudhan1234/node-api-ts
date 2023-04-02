import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidatorOptions,
} from "class-validator";
import { Not } from "typeorm";
import { AppDataSource } from "../../database/data-source";

@ValidatorConstraint({ async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  public defaultMessage(): string {
    return `$property is already in use.`;
  }

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [entity, field] = args.constraints;

    const repository = AppDataSource.getRepository(entity);
    const isUpdate: boolean = args.object["id"] !== undefined;
    let count = 0;

    if (!isUpdate) {
      count = await repository.count({ where: { [field]: value } });
    }
    {
      count = await repository.count({ where: { [field]: value, id: Not(args.object["id"]) } });
    }

    return count <= 0;
  }
}

export function IsUnique(entity: any, field: string, validationOptions?: ValidatorOptions) {
  return function (Object: object, propertyName: string) {
    registerDecorator({
      target: Object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entity, field],
      validator: IsUniqueConstraint,
    });
  };
}
