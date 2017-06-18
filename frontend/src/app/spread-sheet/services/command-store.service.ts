import { Injectable } from '@angular/core';
import { SpreadSheetStoreService, SpreadSheetDispatcherService, SpreadSheetActionService } from "app/spread-sheet/services";
import { Payload } from "app/common/base";
import { SheetEditCommand, Command } from "app/spread-sheet/services/command-actions";
import { _ } from "app";

@Injectable()
export class CommandStoreService {

  private _undoCommandStack: Command[] = [];

  private _redoCommandStack: Command[] = [];

  constructor(
    private spreadSheetDispatcherService: SpreadSheetDispatcherService,
    private spreadSheetStoreService: SpreadSheetStoreService,
    private spreadSheetActionService: SpreadSheetActionService
  ) {
    this.spreadSheetDispatcherService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case SheetEditCommand.EDIT_EVENT:
            this.invokeSheetEditCommand(<SheetEditCommand>payload.data);
            break;
          case SpreadSheetActionService.UNDO_EVENT:
            this.undo();
            break;
          case SpreadSheetActionService.REDO_EVENT:
            this.redo();
            break;
        }
      }
    );
  }

  private invokeSheetEditCommand(command: SheetEditCommand) {
    command.spreadSheet = this.spreadSheetStoreService.spreadSheet;
    command.spreadSheetActionService = this.spreadSheetActionService;
    command.invoke();
    
    this._redoCommandStack = [];
    this._undoCommandStack.push(command);
  }

  private undo() {
    if (_.isEmpty(this._undoCommandStack)) {
      return;
    }
    var command: Command = this._undoCommandStack.pop();
    command.undo();
    this._redoCommandStack.push(command);
  }

  private redo() {
    if (_.isEmpty(this._redoCommandStack)) {
      return;
    }
    var command: Command = this._redoCommandStack.pop();
    command.redo();
    this._undoCommandStack.push(command);
  }

}