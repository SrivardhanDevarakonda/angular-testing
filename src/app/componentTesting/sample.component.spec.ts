import { SampleComponent } from './sample.component';

describe('SampleComponent',()=>{
    let component : SampleComponent
    
    beforeEach(()=>{
      component = new SampleComponent()
    })
     
    it('should increement when increement invoked',()=>{
        component.increement()
        expect(component.value).toBe(1)
    })

    it('should decreement when decreement invoked',()=>{
        component.decreement()
        expect(component.value).toBe(-1)
    })
})