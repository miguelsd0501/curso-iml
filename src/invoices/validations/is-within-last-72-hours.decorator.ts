import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsWithinLast72Hours(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isWithinLast72Hours',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!(value instanceof Date) || isNaN(value.getTime())) {
            return false;
          }

          const now = new Date();
          const seventyTwoHoursAgo = new Date(
            now.getTime() - 72 * 60 * 60 * 1000,
          );

          return value >= seventyTwoHoursAgo && value <= now;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be within the last 72 hours and not in the future`;
        },
      },
    });
  };
}