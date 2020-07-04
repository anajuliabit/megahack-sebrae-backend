import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createRequest1593894718592 implements MigrationInterface {
  private table = new Table({
    name: 'requests',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'status',
        type: 'integer',
        isNullable: false,
      },
      {
        name: 'consumer_id',
        type: 'integer',
        isNullable: false,
      },
      {
        name: 'type',
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

  private foreignKey = new TableForeignKey({
    columnNames: ['consumer_id'],
    referencedColumnNames: ['id'],
    onDelete: 'CASCADE',
    referencedTableName: 'consumers',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
    await queryRunner.createForeignKey('requests', this.foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
