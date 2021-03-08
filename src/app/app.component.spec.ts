import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";

describe("Forms", () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const setForm = (searches: string[]): void =>
    searches.forEach((search) =>
      component.form.get("userName").setValue(search)
    );

  it("should emit userNameChange when form value changes", fakeAsync(() => {
    const spy = spyOn(component.userNameChange, "emit");
    component.ngOnInit();
    const lastValue = "slee102";
    setForm(["s", "sl", "slee", "slee1", lastValue]);
    tick(1000);
    const numCalls = spy.calls.count();
    const callArguments = spy.calls.argsFor(0)[0];
    if (numCalls === 0) {
      fail("userNameChange emit did not occur");
    } else if (numCalls > 1) {
      fail("userNameChange emitted more times than it should");
    } else if (callArguments !== lastValue) {
      fail(
        `userNameChange emitted with ${callArguments.toString()} which is not the expected value`
      );
    }
    //  expect(callArguments).toEqual(lastValue);
  }));
  it("should emit only once when the value has not changed", fakeAsync(() => {
    const spy = spyOn(component.userNameChange, "emit");
    component.ngOnInit();
    const lastValue = "slee102";
    setForm(["s", "sl", "slee", "slee1", lastValue]);
    tick(1000);
    setForm([lastValue]);
    tick(1000);
    if (spy.calls.count() > 1) {
      fail("userNameChange emitted twice for the same value");
    } else if (spy.calls.count() === 0) {
      fail("userNameChange did not emit");
    }
  }));
});
