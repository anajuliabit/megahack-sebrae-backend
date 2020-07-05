import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createRequestPizza1593898499880 implements MigrationInterface {
  private table = new Table({
    name: 'request_pizza',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'slice',
        type: 'integer',
        isNullable: false,
      },
      {
        name: 'status',
        type: 'integer',
        isNullable: false,
      },
      {
        name: 'request_id',
        type: 'integer',
        isNullable: false,
      },
      {
        name: 'pizza_id',
        type: 'integer',
        isNullable: false,
      },
      {
        name: 'created_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'tymestamptz',
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
    columnNames: ['pizza_id'],
    referencedColumnNames: ['id'],
    onDelete: 'CASCADE',
    referencedTableName: 'pizza',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
    await queryRunner.createForeignKey('request_pizza', this.foreignKeyRequest);
    await queryRunner.createForeignKey('request_pizza', this.foreignKeyPizza);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
