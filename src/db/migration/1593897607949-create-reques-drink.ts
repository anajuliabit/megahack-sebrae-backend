import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createRequesDrink1593897607949 implements MigrationInterface {
  private table = new Table({
    name: 'request_drink',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'request_id',
        type: 'integer',
        isNullable: false,
      },
      {
        name: 'drink_id',
        type: 'integer',
        isNullable: false,
      },
      {
        name: 'created_at',
        type: 'timestamptz',
        isPrimary: false,
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamptz',
        isPrimary: false,
        isNullable: false,
        default: 'now()',
      },
    ],
  });

  private foreignKeyRequest = new TableForeignKey({
    columnNames: ['request_id'],
    referencedColumnNames: ['id'],
    onDelete: 'CASCADE',
    referencedTableName: 'requests',
  });

  private foreignKeyPizza = new TableForeignKey({
    columnNames: ['drink_id'],
    referencedColumnNames: ['id'],
    onDelete: 'CASCADE',
    referencedTableName: 'drink',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
    await queryRunner.createForeignKey('request_drink', this.foreignKeyRequest);
    await queryRunner.createForeignKey('request_drink', this.foreignKeyPizza);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
