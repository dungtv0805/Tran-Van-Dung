import * as fs from 'fs';
import * as path from 'path';

class Log {
  public baseDir: string;
  public fileName: string;
  public linePrefix: string;

  public today: Date = new Date();

  constructor() {
    const _dateString = `${this.today.getFullYear()}-${
      this.today.getMonth() + 1
    }-${this.today.getDate()}`;
    const _timeString = `${this.today.getHours()}:${this.today.getMinutes()}:${this.today.getSeconds()}`;

    this.baseDir = path.join(__dirname, '../../.logs/');

    this.fileName = `${_dateString}.log`;
    this.linePrefix = `[${_dateString} ${_timeString}]`;
  }

  // Adds INFO prefix string to the log string
  public info(_string: string): void {
    this.addLog('INFO', _string);
  }

  // Adds WARN prefix string to the log string
  public warn(_string: string): void {
    this.addLog('WARN', _string);
  }

  // Adds ERROR prefix string to the log string
  public error(_string: string): void {
    // Line break and show the first line
    console.log('\x1b[31m%s\x1b[0m', '[ERROR] :: ' + _string.split(/r?\n/)[0]);

    this.addLog('ERROR', _string);
  }

  // Adds the custom prefix string to the log string
  public custom(_filename: string, _string: string): void {
    this.addLog(_filename, _string);
  }

  /**
   * Creates the file if does not exist, and
   * append the log kind & string into the file.
   */
  private addLog(_kind: string, _string: string): void {
    console.log(_kind, ': ', _string);
  }

  /**
   * Deletes the log files older than 'X' days
   *
   * Note: 'X' is defined in .env file
   */
  public clean(): void {
    //
  }
}

export default new Log();
