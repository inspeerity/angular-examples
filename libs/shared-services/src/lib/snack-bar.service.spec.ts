import { TestBed, inject } from "@angular/core/testing";
import { MatSnackBar } from "@angular/material";

import { provideMagicalMock } from "@ins/tools/testing";

import { SnackBarService } from "./snack-bar.service";

describe("SnackBarService", () => {
  let service: SnackBarService, matSnackBar: MatSnackBar;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SnackBarService, provideMagicalMock(MatSnackBar)]
    });
    service = TestBed.get(SnackBarService);
    matSnackBar = TestBed.get(MatSnackBar);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("showSnackbar()", () => {
    it("should call open method with default values", () => {
      const message = "Wow!";

      service.showSnackbar(message);

      expect(matSnackBar.open).toHaveBeenCalledWith(message, null, {
        duration: 3000,
        panelClass: []
      });
    });

    it("should call open method with provided values", () => {
      const message = "Wow!";
      const action = {};
      const options = {
        duration: 2000,
        panelClass: ["custom"]
      };

      service.showSnackbar(message, options, action);

      expect(matSnackBar.open).toHaveBeenCalledWith(message, action, options);
    });
  });

  describe("showWarningSnackbar()", () => {
    it("should call open method with values", () => {
      const message = "Error!";

      service.showWarningSnackbar(message);

      expect(matSnackBar.open).toHaveBeenCalledWith(message, null, {
        duration: 4000,
        panelClass: ["warning-snackbar"]
      });
    });
  });
});
